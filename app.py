from flask import Flask,render_template,request,jsonify,url_for
import server.util

app = Flask(__name__,template_folder='client/templates',static_folder='client/static')

@app.route('/')
def index():
   return render_template('index.html')

@app.route('/predict',methods=['POST','GET'])
def predict():
   if request.method == 'POST':
      transmission = request.form['transmission']
      fuel = request.form['fuel']
      owner = request.form['owner']
      year = int(request.form['year'])
      km_driven = int(request.form['km_driven'])
      return jsonify({'estimated_price':server.util.predict_price(transmission,fuel,owner,year,km_driven)})
   
if __name__ == '__main__':
   server.util.load_artifacts()
   app.run(debug=True)
