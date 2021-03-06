var uint64be = require('./')
var tape = require('tape')

var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1

tape('encode', function (t) {
  t.same(uint64be.encodingLength(42), 8)
  t.same(uint64be.encode(Math.pow(2, 32)), new Buffer([0, 0, 0, 1, 0, 0, 0, 0]))
  t.same(uint64be.encode(Math.pow(2, 32) + 1), new Buffer([0, 0, 0, 1, 0, 0, 0, 1]))
  t.same(uint64be.encode(42), new Buffer([0, 0, 0, 0, 0, 0, 0, 42]))
  t.same(uint64be.encode(42424242424242), new Buffer([0x0, 0x0, 0x26, 0x95, 0xa9, 0xe6, 0x49, 0xb2]))
  t.same(uint64be.encode(MAX_SAFE_INTEGER), new Buffer([0x0, 0x1f, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff]))
  t.same(uint64be.encode.bytes, 8)
  t.end()
})

tape('decode', function (t) {
  t.same(uint64be.decode(new Buffer([0, 0, 0, 1, 0, 0, 0, 0])), Math.pow(2, 32))
  t.same(uint64be.decode(new Buffer([0, 0, 0, 1, 0, 0, 0, 1])), Math.pow(2, 32) + 1)
  t.same(uint64be.decode(new Buffer([0, 0, 0, 0, 0, 0, 0, 42])), 42)
  t.same(uint64be.decode(new Buffer([0x0, 0x0, 0x26, 0x95, 0xa9, 0xe6, 0x49, 0xb2])), 42424242424242)
  t.same(uint64be.decode(new Buffer([0x0, 0x1f, 0xff, 0xff, 0xff, 0xff, 0xff, 0xff])), MAX_SAFE_INTEGER)
  t.same(uint64be.decode.bytes, 8)
  t.end()
})
