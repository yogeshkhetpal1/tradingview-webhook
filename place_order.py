# place_order.py
import sys
import json
from ib_insync import *

ib = IB()
ib.connect('127.0.0.1', 7497, clientId=1)

# Read input
data = json.loads(sys.argv[1])
symbol = data.get('ticker')
action = data.get('action', 'BUY')
qty = 1  # You can make this dynamic

contract = Stock(symbol, 'SMART', 'USD')
market_data = ib.reqMktData(contract, '', False, False)
ib.sleep(2)
ib.cancelMktData(contract)

order = MarketOrder(action, qty)
ib.placeOrder(contract, order)
ib.disconnect()
