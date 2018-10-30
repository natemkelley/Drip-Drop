import sys
import time
import random
import json

constant = random.randint(0,1)
rate_cnt = random.randint(0,12)
minutes = random.randint(0,5)

data = {}
data['status'] = '200'
data['usage'] = round(rate_cnt * constant,4)
data['cycle'] = minutes

if(data['usage']>11):
    data['status'] = '500'	

time.sleep(5)
json_data = json.dumps(data)
print(json_data)
sys.stdout.flush()