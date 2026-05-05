import unittest
from algorithms import binary_search, bubble_sort


class TestAlgorithms(unittest.TestCase):
    """
    Unit tests for algorithms.py.
    """

    def test_binary_search_found(self):
        """Test binary_search when target is in the list."""
        arr = [1, 2, 3, 4, 5]
        self.assertEqual(binary_search(arr, 3), 2)
        self.assertEqual(binary_search(arr, 1), 0)
        self.assertEqual(binary_search(arr, 5), 4)

    def test_binary_search_not_found(self):
        """Test binary_search when target is not in the list."""
        arr = [1, 2, 3, 4, 5]
        self.assertEqual(binary_search(arr, 6), -1)
        self.assertEqual(binary_search(arr, 0), -1)

    def test_binary_search_empty(self):
        """Test binary_search with an empty list."""
        arr = []
        self.assertEqual(binary_search(arr, 1), -1)

    def test_binary_search_single_element(self):
        """Test binary_search with a single element."""
        arr = [10]
        self.assertEqual(binary_search(arr, 10), 0)
        self.assertEqual(binary_search(arr, 5), -1)

    def test_bubble_sort_unsorted(self):
        """Test bubble_sort with an unsorted list."""
        arr = [64, 34, 25, 12, 22, 11, 90]
        expected = [11, 12, 22, 25, 34, 64, 90]
        self.assertEqual(bubble_sort(arr), expected)

    def test_bubble_sort_sorted(self):
        """Test bubble_sort with an already sorted list."""
        arr = [1, 2, 3, 4, 5]
        expected = [1, 2, 3, 4, 5]
        self.assertEqual(bubble_sort(arr), expected)

    def test_bubble_sort_reverse(self):
        """Test bubble_sort with a reverse sorted list."""
        arr = [5, 4, 3, 2, 1]
        expected = [1, 2, 3, 4, 5]
        self.assertEqual(bubble_sort(arr), expected)

    def test_bubble_sort_empty(self):
        """Test bubble_sort with an empty list."""
        arr = []
        expected = []
        self.assertEqual(bubble_sort(arr), expected)

    def test_bubble_sort_single(self):
        """Test bubble_sort with a single element."""
        arr = [1]
        expected = [1]
        self.assertEqual(bubble_sort(arr), expected)


if __name__ == "__main__":
    unittest.main()
