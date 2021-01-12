'use strict';

import GameBuilder from "./game.js"


const game = new GameBuilder()
            .withGameDuration(10)
            .withItemCounts(10)
            .build()

