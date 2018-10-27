import sys, json
import time
import RPi.GPIO as GPIO
from time import sleep


systemargs = sys.argv
currentUsage = systemargs[3]
timer = systemargs[2]
liters = systemargs[1]

print (currentUsage)  
print (liters)
print(timer)



