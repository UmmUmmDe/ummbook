# Ummbook

## About

Ummbook is an engine for creating interactive gamebooks.

## Usage

To use Ummbook, create a JSON file named ```game.json``` in the root directory.

Example:

```json
{
    "scenes": {
        "start": {
            "text": "This is the start scene.",
            "choices": [{"scene": "firstScene", "text": "Begin"}]
        },
        "firstScene": {
            "text": "This is the first scene!",
            "choices": [{"scene": "start", "text": "Go back"}]
        }
    },
    "startScene": "start"
}
```
