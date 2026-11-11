import requests

def get_razas():
    r = requests.get("https://dog.ceo/api/breeds/list")
    print(r.status_code)
    # print(r.text)
    # print(type(r.text)) # str
    razas = r.json()
    for i in razas.values(): #Utilizamos values() para obtener los valores del diccionario
        print(f"Raza de los perros: {i[5]}")