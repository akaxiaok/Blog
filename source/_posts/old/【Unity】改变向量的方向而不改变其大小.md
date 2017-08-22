---
title: 改变向量的方向而不改变其大小
---
最近在做一个打砖块游戏时遇到一个小问题，就是小球有可能会在左右两个边界之间做循环往返运动而导致游戏无法继续进行下去，于是我打算让小球在垂直撞向边界时改变一下方向，但是速度不变，尝试了一些方法但是没有达到效果。后来想到，速度是一个向量，问题就变成了改变一个向量的方向而不改变它的大小，Google一下找到了这个[旋转矩阵](https://zh.wikipedia.org/zh/%E6%97%8B%E8%BD%AC%E7%9F%A9%E9%98%B5)Wiki页面。
虽然游戏是3D的但是只是在一个平面上运动，所以只需要下面这个旋转矩阵
![2D旋转矩阵](http://images.cnblogs.com/cnblogs_com/castdream/763932/o_f12a2173c9fb0a5e8bd86a9408e70835.png)

用原向量矩阵[x,y]乘以旋转矩阵
矩阵外积，左行乘右列
代码如下
```cs
    /// <summary>
    /// 旋转向量，使其方向改变，大小不变
    /// </summary>
    /// <param name="v">需要旋转的向量</param>
    /// <param name="angle">旋转的角度</param>
    /// <returns>旋转后的向量</returns>
  private Vector2 RotationMatrix(Vector2 v, float angle)
    {
        var x = v.x;
        var y = v.y;
        var sin = Math.Sin(Math.PI * angle / 180);
        var cos = Math.Cos(Math.PI * angle / 180);
        var newX = x * cos + y * sin;
        var newY = x * -sin + y * cos;
        return new Vector2((float)newX, (float)newY);
    }
```
