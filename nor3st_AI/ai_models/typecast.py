import requests
import time
import os

class GetVoice:
    def __init__(self, url="", speech_text="") -> None:
        self.API_TOKEN = os.getenv("TYPECASE_API_KEY")
        self.HEADERS = {'Authorization': f'Bearer {self.API_TOKEN}'}
        self.url = url
        self.my_first_actor_id = "6256845748f54c5f0e5438bb"
        self.speak_url = ""
        self.speech_text = speech_text
        self.result = {}
        
    def __enter__(self):
        if self.url == "actor":
            print("actor")
            self.result["actor_id"] = self.get_my_actor()
        elif self.url == "voice_file":
            self.request_speech_synthesis()
            self.result["filepath"] = self.get_speech_result()

        return self.result
    def __exit__(self, exc_type, exc_value, traceback):
        pass
        
    
    
    def get_my_actor(self):
        r = requests.get('https://typecast.ai/api/actor', headers=self.HEADERS)
        my_actors = r.json()['result']
        my_first_actor = my_actors[0]
        my_first_actor_id = my_first_actor['actor_id']
        print(my_actors, my_first_actor, my_first_actor_id)
        return my_first_actor_id
    

# request speech synthesis
    def request_speech_synthesis(self):
        r = requests.post('https://typecast.ai/api/speak', headers=self.HEADERS, json={
            'text': self.speech_text,
            'lang': 'auto',
            'actor_id': self.my_first_actor_id,
            'xapi_hd': True,
            'style_label_version': 'latest'
        })
        self.speak_url = r.json()['result']['speak_v2_url']
        
    def get_speech_result(self):
        filepath = ""
        for _ in range(10):
            r = requests.get(self.speak_url, headers=self.HEADERS)
            ret = r.json()['result']
            if ret['status'] == 'done':
                # download audio file
                r = requests.get(ret['audio_download_url'])
                filepath = os.path.join("static/lecture_source", self.speech_text)
                with open(f'{filepath}.wav', 'wb') as f:
                    f.write(r.content)
                break
            else:
                print(f"status: {ret['status']}, waiting 1 second")
                time.sleep(10)
    
        return filepath