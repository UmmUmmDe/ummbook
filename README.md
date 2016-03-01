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

Choices provide the ability to use keyboard controls to select items. You can
have at most 10 choices (after 10 is undefined). As an alternative to choices,
you can use inline links.

```json
...
"text": "This is the first scene! [[Go back|start]]"
...
```

In this particular case, a choice would be better, as the player can use
keyboard controls.

A link can also be like this (without link text):

```json
...
"text": "[[https://google.com]]"
...
```

There are also commands that can be used in text:

Clears the text if clearing is disabled:

```json
...
"text": "{{clear}}"
...
```

Prevents clearing if clearing is enabled (do not use yet, it's quite buggy):

```json
...
"text": "{{stopclear}}"
...
```

## JSON Settings

```scenes``` is an array of scenes. Required.

```startScene``` holds the name of the first scene. Required.

```clear``` is a boolean that determines if clearing is enabled. Defaults to
true.
