import json
import requests
from bs4 import BeautifulSoup
import re



def get_data(url, track, div_name_qualifier):
    response = requests.get(url)
    link_dict = {}
    if response.status_code == 200:

        with open('source.html', 'w', encoding='utf-8') as file:
            file.write(response.text)
        print('Salvo')
        remover_comentarios_html('source.html','source.html')
        
        with open('source.html', 'r', encoding='utf-8') as f:
            html_content = f.read()

        soup = BeautifulSoup(html_content, 'html.parser')
        col_item_divs = soup.find_all("div", class_="col-item cb85w4")

        for div in col_item_divs:
            links = div.find_all('a')

            for link in links:
                link_dict[link.text] = link['href']

            
    expertise_list = []

    for expertise in link_dict:
        json = {}
        list_qualifiers = []
        # print(link_dict[expertise])
        url = link_dict[expertise]
        if not url.startswith('https://www.oracle.com'):
            url = f'https://www.oracle.com{link_dict[expertise]}'
        # print(url)
        response = requests.get(url)
        soup = BeautifulSoup(response.text, 'html.parser')
        col_item = soup.find_all("div", class_=div_name_qualifier)

        for div in col_item:
            qualifiers = div.find_all('h3')
            for qualifier in qualifiers:
                list_qualifiers.append(qualifier.text)
        
        json = {
            'name': expertise,
            'track': track,
            'qualifiers': list_qualifiers
        }
        expertise_list.append(json)
        insert = requests.post('http://localhost:3000/baseCertificate/',json=json)
        if insert.status_code == 201:
            print(f'Insert feito: {expertise}')
        else:
            print(f'Erro para {expertise}: ', insert.content)
        # print(insert.status_code,)
    # print('Feito:',track,' ',len(expertise_dict[track]))

    return expertise_list

def remover_comentarios_html(arquivo_entrada, arquivo_saida):
    with open(arquivo_entrada, 'r') as entrada:
        linhas = entrada.readlines()

    with open(arquivo_saida, 'w') as saida:
        for linha in linhas:
            if not linha.strip().startswith("<!--") or not linha.strip().endswith("-->"):
                saida.write(linha)

def main():
    track_list = {
            '1':['https://www.oracle.com/partnernetwork/expertise/cloud-build/','col-item bgdarkgreen txtlight','Cloud Build Track'],
            '2':['https://www.oracle.com/partnernetwork/expertise/cloud-sell/','col-item bgblue txtlight','Cloud Sell Track'],
            '3':['https://www.oracle.com/partnernetwork/expertise/cloud-service-applications/','col-item bglightorange txtlight','Cloud Service Track'],
            '4':['https://www.oracle.com/partnernetwork/expertise/cloud-service-infrastructure/','col-item bglightorange txtlight','Cloud Service Track'],
            '5':['https://www.oracle.com/partnernetwork/expertise/cloud-service-industries/','col-item bglightorange txtlight', 'Cloud Service Track'],
            '6':['https://www.oracle.com/partnernetwork/expertise/industry-healthcare/','col-item bgdarkgreen txtlight', 'Industry Healthcare'],
            '7':['https://www.oracle.com/partnernetwork/expertise/license-hw-build/','col-item bggrey txtlight','License & hardware'],
            '8':['https://www.oracle.com/partnernetwork/expertise/license-hw-sell/','col-item bggrey txtlight','License & hardware'],
            '9':['https://www.oracle.com/partnernetwork/expertise/license-hw-service/','col-item bggrey txtlight','License & hardware']
    }
    counter = 0 
    for track in track_list:
        print(track_list[track][0])
        retorno = get_data(track_list[track][0], track_list[track][2], track_list[track][1])

if __name__ == "__main__":
    main()
