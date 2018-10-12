def deferRun(fn, delayFrames=0):
    run('args[0]()', fn, fromOP=me, delayFrames=delayFrames)

class Async:
    def __init__(self, name):
        self.name = name

    def sayHello(self):
        print('Hello ' + self.name)
        deferRun(self.sayGoodbye, delayFrames=me.time.rate * 1)

    def sayGoodbye(self):
        print('Goodbye ' + self.name)
