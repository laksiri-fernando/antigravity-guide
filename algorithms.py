def binary_search(arr, target):
    """
    Performs a binary search on a sorted list to find the index of a target value.

    Args:
        arr (list): A sorted list of elements.
        target (any): The value to search for.

    Returns:
        int: The index of the target if found, otherwise -1.
    """
    low = 0
    high = len(arr) - 1

    while low <= high:
        mid = (low + high) // 2
        guess = arr[mid]
        if guess == target:
            return mid
        if guess > target:
            high = mid - 1
        else:
            low = mid + 1
    return -1


def bubble_sort(arr):
    """
    Sorts a list of elements in ascending order using the bubble sort algorithm.

    Args:
        arr (list): The list of elements to sort.

    Returns:
        list: The sorted list.
    """
    n = len(arr)
    # Optimize by checking if no swaps occurred in a pass
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr
