// 设置精度
precision mediump float;

// 接收three.js公共值
varying vec2 vUv;

// 接收three.js传递的值
// 渲染执行的时长
uniform float time;

// 伪随机方法
/*
* st: vec2二维向量的参数
*/
float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453);
}

//旋转函数
/**
* uv: 顶点坐标
* rotation: 旋转角度
* mid: 旋转中心
*/
vec2 rotate(vec2 uv, float rotation, vec2 mid) {
  return vec2(cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x, cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y);
}

void main() {

  // 利用uv实现渐变效果, 从左到右
  // color = vUv.x;
  // gl_FragColor = vec4(color, color, color, 1.0);

  // 利用uv实现渐变效果, 从右到左
  // color = 1.0 - vUv.x;
  // gl_FragColor = vec4(color, color, color, 1.0);

  // 利用uv实现渐变效果, 从上到下
  // color = vUv.y;
  // gl_FragColor = vec4(color, color, color, 1.0);

  // 利用uv实现渐变效果, 从下到上
  // color = 1.0 - vUv.y;
  // gl_FragColor = vec4(color, color, color, 1.0);

  // 利用uv实现渐变效果, 实现短范围的渐变
  // color = vUv.y * 10.0;
  // gl_FragColor = vec4(color, color, color, 1.0);

  // 通过mod()取模(求余)实现段范围渐变效果
  // color = mod(vUv.y * 10.0, 1.0);
  // gl_FragColor = vec4(color, color, color, 1.0);

  // 利用step()步长, 如果x < edge，返回0.0，否则返回1.0
  // color = step(0.8, mod(vUv.x * 10.0, 1.0));
  // 如果color < 0.5, 返回0.0, 否则返回1.0
  // color += step(0.8, mod(vUv.y * 10.0, 1.0));
  // gl_FragColor = vec4(color, color, color, 1.0);

  // 利用step()步长,相减
  // color = step(0.8, mod(vUv.x * 10.0, 1.0));
  // 相减
  // color -= step(0.8, mod(vUv.y * 10.0, 1.0));
  // gl_FragColor = vec4(color, color, color, 1.0);

  // 利用step()步长,相加
  // color = step(0.8, mod(vUv.x * 10.0, 1.0));
  // color += step(0.8, mod(vUv.y * 10.0, 1.0));
  // gl_FragColor = vec4(color, color, color, 1.0);

  // 利用step()步长,相乘
  // color = step(0.2, mod(vUv.x * 10.0 + 0.01, 1.0));
  // color *= step(0.2, mod(vUv.y * 10.0 + 0.01, 1.0));
  // gl_FragColor = vec4(color, color, color, 1.0);

  // 利用绝对值abs()实现渐变效果
  // color = abs(vUv.x - 0.5);
  // gl_FragColor = vec4(color, color, color, 1.0);

  // 利用绝对值abs()取最小值min()实现渐变效果
  // float color = min(abs(vUv.x - 0.5), abs(vUv.y - 0.5));
  // gl_FragColor = vec4(color, color, color, 1.0);

  // max()取最大值
  // float color = 0.5 - max(abs(vUv.x - 0.5), abs(vUv.y - 0.5));
  // gl_FragColor = vec4(color, color, color, 1.0);

  // 补偿和最大值效果
  // float color = 1.0 - step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
  // gl_FragColor = vec4(color, color, color, 1.0);

  // float()向下取整, 获得x轴条纹
  // float color = floor(vUv.x * 10.0) / 10.0;
  // gl_FragColor = vec4(color, color, color, 1);

  // float()向下取整, XY轴条纹, 两者相乘
  // float color = floor(vUv.x * 10.0) / 10.0 * floor(vUv.y * 10.0) / 10.0;
  // gl_FragColor = vec4(color, color, color, 1);

  // ceil()向上取整, XY轴条纹, 两者相乘
  // float color = ceil(vUv.x * 10.0) / 10.0 * ceil(vUv.y * 10.0) / 10.0;

  // 随机数
  // float color = random(vUv + time);
  // gl_FragColor = vec4(color, color, color, 1);

  // 随机打乱黑色白色
  // float color = ceil(vUv.x * 10.0) / 10.0 * ceil(vUv.y * 10.0) / 10.0 + time / 1800000.0; // 除以1800000.0进行减速效果
  // color = random(vec2(color, color));
  // gl_FragColor = vec4(color, color, color, 1);

  // length()计算长度实现随着半径渐变效果
  // 二维向量vec2(), 那么其长度为两个值相加后的长度(不支持Vec3和Vec4)
  // float color = length(vUv);
  // gl_FragColor = vec4(color, color, color, 1);

  // 通过distance()计算vec2两个向量的距离
  // float color = distance(vUv, vec2(0.5, 0.5));
  // gl_FragColor = vec4(color, color, color, 1);

  // 通过distance()计算vec2两个向量的距离,
  // float color = distance(vUv, vec2(0.5, 0.5));
  // gl_FragColor = vec4(color, color, color, 1);

  // 通过distance()计算vec2两个向量的距离, 一开始两点之间距离的值很小, 通过除法放大 0.15/0.1 = 1.5
  // float color = 0.15 / distance(vUv, vec2(0.5, 0.5));
  // gl_FragColor = vec4(color, color, color, 1);

  // 实现一个小太阳效果. 把计算的值- 1.0, 实现外包围的黑色, 在给其设置透明度, 隐藏黑色外包
  // float color = 0.05 / distance(vUv, vec2(0.5, 0.5));
  // gl_FragColor = vec4(color, color, color, color); // 透明度也设置为color,隐藏黑色外包

  // 对上面生成的效果进行y轴的偏移, 对y轴进行偏移 
  // float color = 0.05 / distance(vec2(vUv.x, (vUv.y - 0.5) * 5.0), vec2(0.5, 0.5));
  // gl_FragColor = vec4(color, color, color, color); // 透明度也设置为color,隐藏黑色外包

  // 实现一个交叉的星星
  // float color = 0.05 / distance(vec2(vUv.x, (vUv.y - 0.5) * 5.0 + 0.5), vec2(0.5, 0.5));
  // color += 0.05 / distance(vec2(vUv.y, (vUv.x - 0.5) * 5.0 + 0.5), vec2(0.5, 0.5));
  // gl_FragColor = vec4(color, color, color, color); // 透明度也设置为color,隐藏黑色外包

  // 通过旋转函数实现星星的旋转效果, 传入time参数(渲染执行的时长), 让其一致旋转
  vec2 rotateColor = rotate(vUv, time, vec2(0.5));

  float color = 0.05 / distance(vec2(rotateColor.x, (rotateColor.y - 0.5) * 5.0 + 0.5), vec2(0.5, 0.5));
  color += 0.05 / distance(vec2(rotateColor.y, (rotateColor.x - 0.5) * 5.0 + 0.5), vec2(0.5, 0.5));

  gl_FragColor = vec4(color, color, color, color); // 透明度也设置为color,隐藏黑色外包
}
