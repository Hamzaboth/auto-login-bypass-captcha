#fuck js files

# read from the secret banks of possibilities 
filei = open('.secretbank3','r');
# add to the full secret phrases folder, of all combos
fileout = open('.secretphrases','a',);
phrases=[];

for line in filei:
    phrases.append(line);

filei.close();
#print(str(phrases));

phrase1 = phrases[0].split();
phrase2 = phrases[1].split();
phrase3 = phrases[2].split();
phrase4 = phrases[3].split();
phrase5 = phrases[4].split();
# print(str(phrase1));
# print(str(phrase2));
# print(str(phrase3));
# print(str(phrase4));
# print(str(phrase5));

for i1 in range(0, len(phrase1)):
    for i2 in range(0, len(phrase2)):
        for i3 in range(0,len(phrase3)):
            for i4 in range(0, len(phrase4)):
                for i5 in range(0, len(phrase5)):
                    passphrase = phrase1[i1] + phrase2[i2] + phrase3[i3] + phrase4[i4] + phrase5[i5] + '\n';
                    fileout.write(passphrase);

fileout.close();



# print(str(passphrase));
    

