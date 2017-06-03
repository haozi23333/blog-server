/**
 * Created by haozi on 2017/05/28.
 */
global.Promise = require('bluebird')
require('mongoose').Promise = global.Promise
require('./lib/app')
