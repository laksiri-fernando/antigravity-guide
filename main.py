from algorithms import binary_search, bubble_sort


def example_algorithms():
    """
    Demonstrates the usage of binary search and bubble sort.
    """
    print("--- Bubble Sort Example ---")
    data = [64, 34, 25, 12, 22, 11, 90]
    print(f"Original list: {data}")
    sorted_data = bubble_sort(data.copy())
    print(f"Sorted list:   {sorted_data}")

    print("\n--- Binary Search Example ---")
    target = 22
    index = binary_search(sorted_data, target)
    print(f"Searching for {target} in sorted list...")
    if index != -1:
        print(f"Found {target} at index {index}.")
    else:
        print(f"{target} not found.")


def main():
    print("Hello from antigravity-guide!")
    example_algorithms()


if __name__ == "__main__":
    main()
