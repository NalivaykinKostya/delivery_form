# venv\Scripts\activate

import requests
from flask import Flask, render_template, request, jsonify
import csv
import collections

def read_dictionary(local_file):
	with open(local_file, 'r') as f:
		reader = csv.DictReader(f)
		posts = [row for row in reader]
		return posts


app = Flask(__name__)

@app.route('/')
def index():
	return render_template('form.html')

@app.route('/home')
def home():
    headers = ['Наименование структурного подразделения', '', 'Должность', 'ФИО', 'мобильный номер', 
	'внутренний номер', '№     кабинета', 'e-mail', 'дата рождения']
    posts = read_dictionary('dataЛист2.csv') # справочник
    return render_template("home.html",
        title = 'Home',
        posts = posts,
        headers = headers)
@app.route('/home2')
def home2():
    headers = ['ФИО', 'мобильный номер','внутренний номер']
    posts = read_dictionary('dataЛист2.csv') # справочник
    adress_list = {item['ФИО'] : {'mtel' : item['мобильный номер'], 'tel' : item['внутренний номер']}  for item in posts}
    sorted_adress_list = collections.OrderedDict(sorted(adress_list.items(), key=lambda t: t[0]))
    return render_template("home2.html",
        title = 'Home',
        posts = sorted_adress_list,
        headers = headers)    
@app.route('/map')
def map():
    headers = ['ФИО', 'должность', 'мобильный номер','внутренний номер', '№     кабинета', 'e-mail', 'дата рождения']
    posts = read_dictionary('dataЛист2.csv') # справочник
    adress_list = {item['ФИО'] : {'position' : item['Должность'], 'mtel' : item['мобильный номер'], 
        'tel' : item['внутренний номер'], 'location' : item['№     кабинета'],
        'mail' : item['e-mail'], 'birthday' : item['дата рождения']}  for item in posts}
    sorted_adress_list = collections.OrderedDict(sorted(adress_list.items(), key=lambda t: t[0]))
    return render_template("map.html",
        title = 'Map',
        posts = sorted_adress_list,
        headers = headers)  

@app.route('/process', methods=['GET', 'POST'])
def process():
    name = request.form['name']
    name = name.capitalize()
    headers = ['ФИО', 'должность', 'мобильный номер','внутренний номер', '№     кабинета', 'e-mail', 'дата рождения']
    posts = read_dictionary('dataЛист2.csv') # справочник
    adress_list = {item['ФИО'] : {'position' : item['Должность'], 'mtel' : item['мобильный номер'], 
        'tel' : item['внутренний номер'], 'location' : item['№     кабинета'],
        'mail' : item['e-mail'], 'birthday' : item['дата рождения']}  for item in posts}
    f_dict = {item : adress_list.get(item) for item in adress_list.keys() if name in item}   
    sorted_adress_list = collections.OrderedDict(sorted(f_dict.items(), key=lambda t: t[0]))

    return render_template("map.html",
        title = 'Map',
        posts = sorted_adress_list,
        headers = headers)  

if __name__ == '__main__':
	app.run(host='0.0.0.0', debug=True)


