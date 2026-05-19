import urllib.request
import urllib.error
import json

paths = ['/api/kpis', '/api/revenue-by-gender', '/api/business-insights']
for path in paths:
    url = 'http://127.0.0.1:8000' + path
    try:
        with urllib.request.urlopen(url) as r:
            print(path, r.status)
            body = r.read().decode('utf-8')
            print(body)
    except urllib.error.HTTPError as e:
        print(path, 'HTTP', e.code)
        try:
            print(e.read().decode('utf-8', errors='replace'))
        except Exception as exc:
            print('Error reading body:', exc)
    except Exception as e:
        print(path, 'ERR', e)
