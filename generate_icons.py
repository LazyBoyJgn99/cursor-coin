#!/usr/bin/env python3
try:
    from PIL import Image, ImageDraw
    import math
    
    def draw_crypto_icon(draw, size, center_x, center_y, scale=1.0):
        """绘制加密货币风格的立体图标"""
        s = scale
        
        # 调整坐标系，原始SVG是287x274，中心大约在(128.5, 128.5)
        def scale_point(x, y):
            # 将原始坐标转换为以中心为原点的坐标系
            scaled_x = int((x - 128.5) * s + center_x)
            scaled_y = int((y - 128.5) * s + center_y)
            return (scaled_x, scaled_y)
        
        # 外圆 - 白色填充，黑色边框
        radius = int(123.5 * s)  # 原始半径约为123.5
        circle_width = max(1, int(10 * s))
        draw.ellipse([center_x - radius, center_y - radius, 
                     center_x + radius, center_y + radius], 
                     fill=(255, 255, 255), outline=(0, 0, 0), width=circle_width)
        
        # 绘制主要的几何形状
        line_width = max(1, int(4 * s))
        
        # 中央垂直线
        draw.line([scale_point(130.5, 11), scale_point(130.5, 128)], 
                 fill=(0, 0, 0), width=line_width)
        
        # 从顶点到左下的线
        draw.line([scale_point(130.5, 11), scale_point(28.5, 66)], 
                 fill=(0, 0, 0), width=line_width)
        
        # 从顶点到右下的线
        draw.line([scale_point(130.5, 11), scale_point(228, 70)], 
                 fill=(0, 0, 0), width=line_width)
        
        # 从中心到左下的线
        draw.line([scale_point(130.5, 129.5), scale_point(31, 190)], 
                 fill=(0, 0, 0), width=line_width)
        
        # 左侧垂直线
        draw.line([scale_point(28.0625, 63.9995), scale_point(32.4998, 192.5)], 
                 fill=(0, 0, 0), width=line_width)
        
        # 底部左侧线
        draw.line([scale_point(30.0019, 190.991), scale_point(134.5, 246)], 
                 fill=(0, 0, 0), width=line_width)
        
        # 底部右侧线
        draw.line([scale_point(133.001, 244.999), scale_point(234, 185.5)], 
                 fill=(0, 0, 0), width=line_width)
        
        # 右侧垂直线
        draw.line([scale_point(232, 186.5), scale_point(228, 68.5)], 
                 fill=(0, 0, 0), width=line_width)
        
        # 从中心到右侧的线
        draw.line([scale_point(131.5, 130), scale_point(232.5, 186.5)], 
                 fill=(0, 0, 0), width=line_width)
        
        # 填充的三角形区域
        # 上方三角形
        triangle1 = [scale_point(27.75, 64), scale_point(229, 70), scale_point(130.5, 129.5)]
        draw.polygon(triangle1, fill=(0, 0, 0))
        
        # 右上小三角形
        triangle2 = [scale_point(134.014, 127), scale_point(229, 70), scale_point(194.665, 92)]
        draw.polygon(triangle2, fill=(0, 0, 0))
        
        # 右侧大三角形
        triangle3 = [scale_point(130.5, 129), scale_point(228.5, 71), scale_point(133, 246.5)]
        draw.polygon(triangle3, fill=(0, 0, 0))
        
        # 白色线条
        white_line_width = max(1, int(3 * s))
        draw.line([scale_point(225.5, 71.5), scale_point(130.5, 129)], 
                 fill=(255, 255, 255), width=white_line_width)
    
    # 创建favicon.ico (32x32)
    img = Image.new('RGBA', (32, 32), (255, 255, 255, 0))
    draw = ImageDraw.Draw(img)
    draw_crypto_icon(draw, 32, 16, 16, 0.12)
    img.save('public/favicon.ico', format='ICO', sizes=[(16,16), (32,32)])
    
    # 创建logo192.png
    img192 = Image.new('RGBA', (192, 192), (255, 255, 255, 0))
    draw192 = ImageDraw.Draw(img192)
    draw_crypto_icon(draw192, 192, 96, 96, 0.7)
    img192.save('public/logo192.png')
    
    # 创建logo512.png
    img512 = Image.new('RGBA', (512, 512), (255, 255, 255, 0))
    draw512 = ImageDraw.Draw(img512)
    draw_crypto_icon(draw512, 512, 256, 256, 1.8)
    img512.save('public/logo512.png')
    
    print("基于logo2.svg的图标文件创建成功！")
    
except ImportError:
    print("PIL库未安装，创建占位符文件...")
    # 创建简单的占位符文件
    with open('public/favicon.ico', 'wb') as f:
        # 简单的ICO文件头
        f.write(b'\x00\x00\x01\x00\x01\x00\x10\x10\x00\x00\x01\x00\x08\x00h\x05\x00\x00\x16\x00\x00\x00')
        f.write(b'\x00' * 1384)  # 填充数据
    
    print("已创建基本的favicon.ico文件")
    print("建议安装PIL库: pip install Pillow") 