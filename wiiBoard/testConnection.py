import pygatt
import time

def handle_data(handle, value):
    # Process the received data as needed
    print(f"Received data: {value}")

def main():
    adapter = pygatt.GATTToolBackend()

    try:
        adapter.start()

        device = adapter.connect('01:23:45:67:89:AB')  # Replace with your Wii Balance Board's Bluetooth address

        # Subscribe to the Balance Board's characteristic
        device.subscribe('0000fe10-0000-1000-8000-00805f9b34fb', callback=handle_data)

        # Keep the script running to receive data
        while True:
            time.sleep(1)

    finally:
        adapter.stop()

if __name__ == "__main__":
    main()
