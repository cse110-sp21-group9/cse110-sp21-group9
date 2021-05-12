var bullet = {
  date = someDate,
  text = privateText,
  bulletType = 'blackDot',
  parent = null,
  tag = [tag1, tag2],
};

var Note = {
  date = someDate,
  text = someText,
  tag = [tag1, tag2],
};

var Task = {
  title = aTitle,
  date = someDate,
  desc = someDescription,
  status = 'completed', //Also includes "pending" and "not started" maybe, 'rolling'
  tag = [tag1, tag2],
};

var Tracker = {
  title = aTitle,
  dateCreated = someDate,
  nodes: [trackerNode1, trackerNode2],
  scale = 'month', //Also includes day, week, and year maybe.
  tag = [tag1, tag2],
};

var TrackerNode = {
  x = someX,
  date = someDate,
  desc = someDesc,
};