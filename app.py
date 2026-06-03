from flask import Flask, render_template, jsonify, request
from skills import get_skills
from projects import get_projects

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('base.html')

@app.route('/api/skills')
def skills():
    return jsonify(get_skills())

@app.route('/api/projects')
def projects():
    return jsonify(get_projects())

@app.route('/api/contacto', methods=['POST'])
def contacto():
    data = request.get_json()
    nombre = data.get('nombre')
    email = data.get('email')
    mensaje = data.get('mensaje')
    if not nombre or not email or not mensaje:
        return jsonify({'success': False, 'mensaje': 'Todos los campos son requeridos'}), 400
    return jsonify({'success': True, 'mensaje': f'Gracias {nombre}! Tu mensaje fue recibido.'})

if __name__ == '__main__':
    app.run(debug=True)