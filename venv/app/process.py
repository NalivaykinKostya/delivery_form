# venv\Scripts\activate

import requests
from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route('/')
def index():
	return render_template('form.html')

@app.route('/process', methods=['POST'])
def process():
	delivery_type =request.form['delivery_type']
	company_adress =request.form['company_adress']
	company =request.form['company']
	contact_person =request.form['contact_person']
	contact_phone =request.form['contact_phone']
	date =request.form['date']   #2018-02-27
	if company and contact_phone:
		url='https://docs.google.com/forms/d/e/1FAIpQLSfIoE_PNBI5AMhqkrLQHgwoHvQfBaeTCSJ_kh9suc1UsHZVfg/formResponse?entry.209801231=%s&entry.2105496144=%s+&entry.319827962=%s&entry.627417731=%s&entry.1034927361=%s&entry.1435582898_year=%s&entry.1435582898_month=%s&entry.1435582898_day=%s&fvv=1&draftResponse=%%5Bnull%%2Cnull%%2C%%224042173472159526854%%22%%5D%%0D%%0A&pageHistory=0&fbzx=4042173472159526854'
		payload = (delivery_type, company_adress, company,contact_person, contact_phone,date.split('-')[0],date.split('-')[1], date.split('-')[2])
		r = requests.post(url%(payload))
		print(r)

		return jsonify({'name' : 'Success!'})

	return jsonify({'error' : 'Missing data!'})

if __name__ == '__main__':
	app.run(debug=True)


