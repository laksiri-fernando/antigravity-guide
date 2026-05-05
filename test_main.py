import unittest
from unittest.mock import patch
import io
import main


class TestMain(unittest.TestCase):
    """
    Unit tests for main.py.
    """

    @patch('sys.stdout', new_callable=io.StringIO)
    def test_example_algorithms(self, mock_stdout):
        """Test example_algorithms runs and prints expected output."""
        main.example_algorithms()
        output = mock_stdout.getvalue()
        self.assertIn("--- Bubble Sort Example ---", output)
        self.assertIn("Original list:", output)
        self.assertIn("Sorted list:", output)
        self.assertIn("--- Binary Search Example ---", output)
        self.assertIn("Found 22", output)

    @patch('sys.stdout', new_callable=io.StringIO)
    def test_main(self, mock_stdout):
        """Test main function runs correctly."""
        main.main()
        output = mock_stdout.getvalue()
        self.assertIn("Hello from antigravity-guide!", output)
        # Check if example_algorithms output is also present since main calls it
        self.assertIn("--- Bubble Sort Example ---", output)


if __name__ == "__main__":
    unittest.main()
