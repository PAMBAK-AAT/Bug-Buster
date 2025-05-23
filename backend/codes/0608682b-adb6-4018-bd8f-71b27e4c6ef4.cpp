// Write your code here...
#include <iostream>
#include <string>
#include <algorithm>

int main() {
    std::string message = "Hello, World!";
    std::cout << "Original message: " << message << std::endl;

    std::reverse(message.begin(), message.end());
    std::cout << "Reversed message: " << message << std::endl;

    int number = 12345;
    std::cout << "Original number: " << number << std::endl;

    int reversed_number = 0;
    while (number != 0) {
        reversed_number = reversed_number * 10 + number % 10;
        number /= 10;
    }
    std::cout << "Reversed number: " << reversed_number << std::endl;

    return 0;
}