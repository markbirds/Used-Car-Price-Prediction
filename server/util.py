import pickle
import numpy as np
import json

__model = None
__columns = None

def load_artifacts():
    global __model
    global __columns

    with open('server/artifacts/columns.json','r') as f:
        __columns = json.load(f)['columns']

    if __model is None:
        with open('server/artifacts/used_car_price_model','rb') as f:
            __model = pickle.load(f)

def predict_price(transmission,fuel,previous_owner,year,km_driven):
    x = []
    x[:8] = np.zeros(8,dtype='int32')
    x[5] = previous_owner
    x[6] = year
    x[7] = km_driven
    
    transmission_index = np.where(__columns==transmission)[0]
    fuel_index = np.where(__columns==fuel)[0]
    
    if transmission_index>=0:
        x[transmission_index] = 1
    if fuel_index>=2:
        x[fuel_index] = 1
        
    return '{:,}'.format(round(__model.predict([x])[0],2))

if __name__ == '__main__':
    load_model()