# About

This is a parser and visualizer for Archeage combat log files.

# Usage

The public version is available at:

https://csimi.github.io/archeage-parser/

## Game options

To start generating the files you should:
- Open Options
- Switch to the `Game Info` tab
- Tick the checkbox for `Enable combat chat logging` near the bottom
- Click on `Apply`
- Restart the game

The `combat.log` file in `C:\ArcheRage\Documents` should start to have some data after starting the game.

If that did not work find the `system.cfg` file in the same folder and change `option_enable_combat_chat_log` to `1`.

## Recommendation

If you want to have some meaningful statistics you should:
- Change `Damage/Heal Info: Target` to `All`
- Set `Damage/Heal Info: Distance` to `100`
- Switch to the `Functionality` tab
- Enable `Show Default Player Appearances`
- Set `Max Players Displayed` to 200

# Development

Install dependencies:

```
$ npm ci
```

To start the dev server and open in your browser:

```
$ npm start
```

The frontend is built using [React](https://react.dev) with the visualization library [visx](https://airbnb.io/visx/).
