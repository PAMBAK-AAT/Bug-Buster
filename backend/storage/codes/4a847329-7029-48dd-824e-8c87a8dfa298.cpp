// Write your code here...
#include <iostream>
#include <stack>
#include <string>
using namespace std;

bool isValid(string s) {
    stack<char> stk;

    for (char ch : s) {
        if (ch == '(' || ch == '[' || ch == '{') {
            stk.push(ch);
        } else {
            if (stk.empty()) return false;

            char top = stk.top();
            if ((ch == ')' && top == '(') ||
                (ch == ']' && top == '[') ||
                (ch == '}' && top == '{')) {
                stk.pop();
            } else {
                return false;
            }
        }
    }

    return stk.empty();
}

int main() {
    string s;
    cin >> s;

    if (isValid(s)) {
        cout << "YES" << endl;
    } else {
        cout << "N0" << endl;
    }

    return 0;
}
