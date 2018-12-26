const { getBomHis } = require('../../../../routes/v1/field/bomMapHistory.js');

describe('Node.jsの起動/再起動時（サーバー⇨DB）', () => {
  it('bom mapのhistroyを取得したら、fieldに反映される関数のテスト', () => {
    // Given
    const positions = [
      { x: 1, y: 0, actionId: 1 },
      { x: 2, y: 0, actionId: 2 },
      { x: 0, y: 1, actionId: 3 },
    ];
    // When
    const results = [];
    for (let i = 0; i < positions.length; i += 1) {
      const result = getBomHis(positions[i].x, positions[i].y);
      results.push(result);
    }

    // then
    const matcher = [{ x: 1, y: 0 }, { x: 2, y: 0 }, { x: 0, y: 1 }];

    expect(results).toEqual(expect.objectContaining(matcher));
  });
});
