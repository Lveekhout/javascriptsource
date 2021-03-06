function World3D(depth) {
    this.paths = [[[1, 1, 1],[1, 1, 2]],[[1, 1, 3],[1, 1, 4]]]
    this.points = [[1, 2, 3],[4, 5, 6]]

    this.pathsTo2D = () => this.paths.map(path => path.map(point => [point[0] / (point[2] / depth + 1), point[1] / (point[2] / depth + 1)]))
    this.pointsTo2D = () => this.points.map(point => [point[0] / (point[2] / depth + 1), point[1] / (point[2] / depth + 1)])
}