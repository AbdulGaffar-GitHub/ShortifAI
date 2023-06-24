import requests
import json
from bs4 import BeautifulSoup
from newspaper import Article
import newspaper
from summarizer import Summarizer, TransformerSummarizer
import argparse
from typing import List
from nltk import tokenize
from flask import Flask
from flask import request, jsonify, abort, make_response, render_template
from flask_cors import CORS, cross_origin
from dotenv import load_dotenv
import os
import nltk
nltk.download('punkt')
load_dotenv('.env')

app = Flask(__name__)
CORS(app)


class Parser(object):

    def __init__(self, raw_text: str):
        self.all_data = raw_text.split('\n')

    def __isint(self, v) -> bool:
        try:
            int(v)
            return True
        except:
            return False

    def __should_skip(self, v) -> bool:
        return self.__isint(v) or v == '\n' or '-->' in v

    def __process_sentences(self, v) -> List[str]:
        sentence = tokenize.sent_tokenize(v)
        return sentence

    def save_data(self, save_path, sentences) -> None:
        with open(save_path, 'w') as f:
            for sentence in sentences:
                f.write("%s\n" % sentence)

    def run(self) -> List[str]:
        total: str = ''
        for data in self.all_data:
            if not self.__should_skip(data):
                cleaned = data.replace('&gt;', '').replace('\n', '').strip()
                if cleaned:
                    total += ' ' + cleaned
        sentences = self.__process_sentences(total)
        return sentences

    def convert_to_paragraphs(self) -> str:
        sentences: List[str] = self.run()
        return ' '.join([sentence.strip() for sentence in sentences]).strip()


categories = ['top', 'sports', 'technology',
              'business', 'entertainment', 'world', 'politics']
api_keys = os.getenv('API_KEYS').split(',')

global next_page
k = 0


@app.route("/", methods=['GET'])
@cross_origin()
# def home():
#     return render_template('index.html')
# @app.route('/',methods = ['GET','POST'])
def home():
    return 'hello world'


next_page = 0
# PORT=8088
CORS(app, resources={r"/*": {"origins": "*"}})


@app.route('/summarize', methods=['POST'])
def get_news():
    all_news = []
    for i in range(len(categories)):
        print("\n categories " + str(categories[i]))
        result, status_code = fetch_news(
            categories[i], api_keys[i], next_page=0, k=0)
        if status_code == 200:
            all_news.extend(result['articles'])
        else:
            return jsonify({'status': 'error', 'message': 'Failed to fetch news'}), status_code

    final_result = {
        'status': 'success',
        'totalResults': len(all_news),
        'articles': all_news
    }
    return jsonify(final_result), 200


@app.route("/summarize_article", methods=['POST'])
def summarize_article():
    url = request.json.get('url')

    try:
        article = Article(url)
        article.download()
        article.parse()
        summary = convert_raw_text(article.text)

        article_info = {
            'url': article.url,
            'title': article.title,
            'text': summary,
            'top_image': article.top_image,
            'content': article.text,
        }

        return jsonify({'article': article_info})

    except Exception as e:
        print("Entered except block :", e)
        return jsonify({'status': 'error', 'message': 'Failed to summarize article'})


def fetch_news(category, api_key, next_page=0, k=0):
    country = 'in'
    language = 'en'
    url = f"https://newsdata.io/api/1/news?country={country}&language={language}&category={category}&apikey={api_key}"

    # if next_page != 0:
    #     if k<1:
    #         k=k+1
    #         url = f"https://newsdata.io/api/1/news?country={country}&language={language}&apikey={api_key}&category={category}&page={next_page}"

    response = requests.get(url)

    if response.status_code == 200:
        data = response.json()
        articles = data.get('results')
        # next_page = data.get('nextPage')
        # print("next page : " + str(next_page))
        if articles:
            news_list = []
            for article in articles:
                link = article.get('link')
                title = article.get('title')
                content = article.get('content')
                description = article.get('description')
                image_url = article.get('image_url')
                video_url = article.get('video_url')
                pub_date = article.get('pubDate')
                source_id = article['source_id']
                category = article['category']
                if content is None or len(content) < 200:
                    print("\n title :"+str(title) + "   :skipped")
                    # Skip this article if content is empty or less than 200 characters
                    continue
                print("\n title :"+str(title))
                summary = convert_raw_text(content)

                news_dict = {
                    'link': link,
                    'title': title,
                    'summary': summary,
                    'description': description,
                    'image_url': image_url,
                    'video_url': video_url,
                    'pub_date': pub_date,
                    'source_id': source_id,
                    'category': category,
                    'content': content,
                }
                news_list.append(news_dict)

            result = {
                'status': 'success',
                'totalResults': len(news_list),
                'articles': news_list
            }
            return result, 200
        else:
            result = {
                'status': 'error',
                'message': 'No articles found'
            }
            return result, 404
    else:
        result = {
            'status': 'error',
            'message': 'Failed to fetch news'
        }
        return result, response.status_code


def convert_raw_text(articleText):
    ratio = 0.2
    min_length = 25
    max_length = 500

    data = articleText
    if not data:
        abort(make_response(jsonify(message="Request must have raw text"), 400))

    parsed = Parser(articleText).convert_to_paragraphs()
    summary = summarizer(parsed, ratio=ratio,
                         min_length=min_length, max_length=max_length)
    # summary = summary[25:]
    print("summary : " + summary)
    return summary


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='')  # bert-large-uncased
    # parser.add_argument('-model', dest='model', default='bert-base-uncased', help='The model to use')
    parser.add_argument('-model', dest='model',
                        default='bert-large-uncased', help='The model to use')
    parser.add_argument('-transformer-type',
                        dest='transformer_type', default=None,
                        help='Huggingface transformer class key')
    parser.add_argument('-transformer-key', dest='transformer_key', default=None,
                        help='The transformer key for huggingface. For example bert-base-uncased for Bert Class')
    parser.add_argument('-greediness', dest='greediness',
                        help='', default=0.45)
    parser.add_argument('-reduce', dest='reduce', help='', default='mean')
    parser.add_argument('-hidden', dest='hidden', help='', default=-2)
    parser.add_argument('-port', dest='port', help='', default=8087)
    parser.add_argument('-host', dest='host', help='', default='0.0.0.0')

    args = parser.parse_args()

    if args.transformer_type is not None:
        print(f"Using Model: {args.transformer_type}")
        assert args.transformer_key is not None, 'Transformer Key cannot be none with the transformer type'

        summarizer = TransformerSummarizer(
            transformer_type=args.transformer_type,
            transformer_model_key=args.transformer_key,
            hidden=int(args.hidden),
            reduce_option=args.reduce
        )

    else:
        print(f"Using Model: {args.model}")

        summarizer = Summarizer(
            model=args.model,
            hidden=int(args.hidden),
            reduce_option=args.reduce
        )

    app.run(host=args.host, port=int(args.port))
