// Write your code here...

#include <iostream>
#include <stack>
#include <string>
using namespace std;

bool isValidParentheses(const string& s) {
    stack<char> stk;
    for (char c : s) {
        if (c == '(' || c == '{' || c == '[') {
            stk.push(c);
        } else {
            if (stk.empty()) return false;
            char top = stk.top();
            stk.pop();
            if ((c == ')' && top != '(') ||
                (c == '{' && top != '{') ||
                (c == ']' && top != '[')) {
                return false;
            }
        }
    }
    return stk.empty();
}

int main() {
    string s;
    getline(cin, s);

    if (isValidParentheses(s)) {
        cout << "YES\n";
    } else {
        cout << "NO\n";
    }

    return 0;
}
