def add(x, y):
  """Returns the sum of x and y."""
  return x + y

def subtract(x, y):
  """Returns the difference of x and y."""
  return x - y

def multiply(x, y):
  """Returns the product of x and y."""
  return x * y

def divide(x, y):
  """Returns the division of x by y."""
  if y == 0:
    raise ValueError("Cannot divide by zero.")
  return x / y

def main():
  """Runs the command-line calculator interface."""
  while True:
    try:
      num1_str = input("Enter the first number: ")
      if not num1_str:
          print("No input provided. Exiting.")
          break
      num1 = float(num1_str)

      operation = input("Enter an operation (+, -, *, /): ")
      if not operation:
          print("No input provided. Exiting.")
          break


      num2_str = input("Enter the second number: ")
      if not num2_str:
          print("No input provided. Exiting.")
          break
      num2 = float(num2_str)

      if operation == '+':
        result = add(num1, num2)
      elif operation == '-':
        result = subtract(num1, num2)
      elif operation == '*':
        result = multiply(num1, num2)
      elif operation == '/':
        result = divide(num1, num2)
      else:
        print("Invalid operation. Please use +, -, *, or /.")
        continue

      print(f"Result: {result}")

    except ValueError as e:
      print(f"Error: {e}")
    except Exception as e:
      print(f"An unexpected error occurred: {e}")

    another_calculation = input("Do you want to perform another calculation? (yes/no): ").lower()
    if another_calculation != 'yes':
      break

if __name__ == "__main__":
  main()
