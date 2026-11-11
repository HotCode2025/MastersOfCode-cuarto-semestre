import matplotlib.pyplot as plt

def generate_bar_chart(name, labels, values):
    fig, ax = plt.subplots()
    ax.bar(labels, values)
    
    ax.set_title(f'Población histórica - {name}')
    ax.set_xlabel('Año')
    ax.set_ylabel('Población')
    
    plt.savefig(f'./imgs/{name}_bar.png', bbox_inches='tight')
    plt.close()

def generate_pie_chart(name, labels, values):
    values = [float(v) for v in values]
    
    fig, ax = plt.subplots()
    ax.pie(values, labels=labels, autopct='%1.1f%%')
    ax.axis('equal')
    
    ax.set_title(f'Distribución de población - {name}')
    
    plt.savefig('charts_pie_es_una_prueba.png')
    plt.close()

if __name__ == '__main__':
    labels = ['a', 'b', 'c']
    values = [10, 40, 800]

    generate_pie_chart('Test_Region', labels, values)