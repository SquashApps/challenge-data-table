const React = require('react')
const ReactPivot = require('react-pivot')
const createReactClass = require('create-react-class')

const rows = require('./data.json')

const dimensions = [
  {value: 'date', title: 'Date'},
  {value: 'host', title: 'Host'}
]

const reduce = (row, memo) => {
  switch (row.type) {
    case 'impression':
      memo.impressionsCount = (memo.impressionsCount || 0) + 1
      return memo
    case 'display':
      memo.displaysCount = (memo.displaysCount || 0) + 1
      return memo
    case 'load':
      memo.loadsCount = (memo.loadsCount || 0) + 1
      return memo
    default: return memo
  }
}

const calculations = [
  {
    title: 'Impressions',
    value: 'impressionsCount'
  },
  {
    title: 'Loads',
    value: 'loadsCount'
  },
  {
    title: 'Displays',
    value: 'displaysCount'
  },
  {
    title: 'Load Rate',
    value: (row) => (row.loadsCount / row.impressionsCount) * 100,
    template: (val, row) => `${val.toFixed(1)}%`,
  },
  {
    title: 'Display Rate',
    value: (row) => (row.displaysCount / row.loadsCount) * 100,
    template: (val, row) => `${val.toFixed(1)}%`
  },
]

module.exports = createReactClass({
  render () {
    return (
      <div>
        <div>Report</div>
        <ReactPivot
          rows={rows}
          dimensions={dimensions}
          reduce={reduce}
          calculations={calculations}
          nPaginateRows={25}
          activeDimensions={['Date', 'Host']}
        />
      </div>
    )
  }
})
