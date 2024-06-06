from backend import create_app

app = create_app('backend.config.Config')

if __name__ == '__main__':
    app.run(debug=True)