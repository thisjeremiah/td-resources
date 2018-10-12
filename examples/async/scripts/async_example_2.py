def deferRun(fn, delayFrames=0):
    run('args[0]()', fn, fromOP=me, delayFrames=delayFrames)

class CountUpTo:
    def __init__(self, limit):
        self.current = 0
        self.counterOP = op('counter')
        self.limit = limit

    def start(self):
        self.count()

    def count(self):
        self.counterOP.text = str(self.current)
        if self.current < self.limit:
            self.current += 1
            deferRun(self.count, delayFrames=me.time.rate * 1)
