import matplotlib.pyplot as plt
import matplotlib.image as mpimg
import numpy as np

def hist(name):
    img = mpimg.imread(name)
    r = img[:,:,0]
    g = img[:,:,1]
    b = img[:,:,2]
    fig = plt.figure()
    plt.hist(r.ravel(), bins=256, range=(0.0, 1.0), fc='r', ec='r', histtype='step')
    plt.hist(g.ravel(), bins=256, range=(0.0, 1.0), fc='g', ec='g', histtype='step')
    plt.hist(b.ravel(), bins=256, range=(0.0, 1.0), fc='b', ec='b', histtype='step')

hist('bef.png')
hist('aft.png')
plt.show()