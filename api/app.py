import os
import sys

current_dir = os.path.dirname(__file__)
backend_root = os.path.abspath(os.path.join(current_dir, '..', 'backend'))
if backend_root not in sys.path:
    sys.path.insert(0, backend_root)

from app.main import app
