import sys
import json

def place_order(order_data):
    # Example placeholder - replace with your IBKR API code
    print(f"Placing order: {order_data}")
    # Simulate success or failure
    if order_data.get("action") not in ["BUY", "SELL"]:
        raise ValueError("Invalid action")
    # You can integrate ib_insync or other IBKR API calls here
    print("Order placed successfully!")

def main():
    if len(sys.argv) < 2:
        print("No order data received")
        sys.exit(1)

    try:
        order_json = sys.argv[1]
        order_data = json.loads(order_json)
        place_order(order_data)
    except Exception as e:
        print(f"Error placing order: {e}")
        sys.exit(1)

if __name__ == "__main__":
    main()
