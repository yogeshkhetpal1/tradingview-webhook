import sys
import json

def main():
    try:
        data = json.load(sys.stdin)
        print(f"Received data: {data}")

        # Example: print the action and ticker
        action = data.get('action')
        ticker = data.get('ticker')
        price = data.get('price')

        print(f"Action: {action}, Ticker: {ticker}, Price: {price}")

        # TODO: Put your IBKR order placing code here

        print("Order placed successfully!")  # Or your real status message
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
