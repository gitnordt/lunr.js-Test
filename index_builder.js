var lunr = require('./../lunr.js'),
    fs = require('fs')

var idx = lunr(function () {
  this.ref('id')

  this.field('title', { boost: 10 })
  this.field('tags', { boost: 100 })
  this.field('body')
})

fs.readFile('AA-software.json', function (err, data) {
  if (err) throw err

  var raw = JSON.parse(data)

  var questions = raw.questions.map(function (q) {
  var count = 0;
    return {
      id: count++,
      title: q.Software,
      body: q.Description,
      tags: q.Categories
    }
  })

  questions.forEach(function (question) {
    idx.add(question)
  })

  fs.writeFile('AA-software-index.json', JSON.stringify(idx), function (err) {
    if (err) throw err
    console.log('done')
  })
})
