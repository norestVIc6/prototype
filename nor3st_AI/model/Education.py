import subprocess
import logging as log
log.getLogger(__name__)
log.basicConfig(level=log.DEBUG)
log.basicConfig(level=log.DEBUG, format="'%(asctime)s - %(message)s'")
from ai_models.whisper import Whisper

class Education:
    def __init__(self, request, voice_path, url = None):
        self.student_voice_path = voice_path
        self.url = url
        self.model = Whisper().MODEL
        self.result = {}
        
    def __enter__(self):
        if self.url == "text":
            self.result["answer"] = self.user_voice_to_text()
            return self.result

    def __exit__(self, exc_type, exc_value, traceback):
        pass
    
    
    def user_voice_to_text(self):
        result = self.model.transcribe(self.student_voice_path)
        return result["text"]
