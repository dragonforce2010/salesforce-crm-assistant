class RandomColor {
  static colors = [
    "#86E3CE",
    "#D0E6A5",
    "#FFDD94",
    "#FA897B",
    "#CCABD8",
    "#5D7599",
    "#ABB6C8",
    "#DADADA",
    "#F7F0C6",
    "#C2C4B6",
    "#80BEAF",
    "#B3DDD1",
    "#D1DCE2",
    "#F58994",
    "#EE9C6C",
    "#D6A3DC",
    "#F7DB70",
    "#EABEBF",
    "#75CCE8",
    "#A5DEE5",
    "#478BA2",
    "#DE5B6D",
    "#E9765B",
    "#F2A490",
    "#B9D4DB",
    "#DA2864",
    "#EC6091",
    "#F2A7BE",
    "#9AE1E2",
    "#16A5A3",
    "#60EFDB",
    "#BEF2E5",
    "#C5E7F1",
    "#79CEED",
    "#6F89A2",
    "#AAC9CE",
    "#B6B4C2",
    "#C9BBC8",
    "#E5C1CD",
    "#F3D8CF",
    "#33539E",
    "#7FACD6",
    "#BFB8DA",
    "#E8B7D4",
    "#A5678E",
  ]

  static getColor(key) {
    const hash = key.split("").reduce((hash, char) => hash + char.charCodeAt(0), 0);
    return RandomColor.colors[hash % RandomColor.colors.length]
  }
}

module.exports = {
  RandomColor
}