import matplotlib.pyplot as plt
import numpy as np
import os
import tarfile
import urllib
from IPython.display import display, Image
from scipy import ndimage
from sklearn.linear_model import LogisticRegression
from sklearn.linear_model import LinearRegression
import cPickle as pickle

with open("notMNIST.pickle", "rb") as f:
    data = pickle.load(f)

linreg = LinearRegression()
linreg.fit(data['train_dataset'], data['train_labels'])

for i in range(len(data['test_labels'])):
    print data['test_labels'][i], linreg.predict(data['test_dataset'][i])
