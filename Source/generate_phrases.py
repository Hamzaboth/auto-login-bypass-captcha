#fuck js files

print('--Opening file--\n');
# read from the secret banks of possibilities 
filei = open('.secretbank3','r');
phrases=[];
print('--Reading file--\n');
for line in filei:
    phrases.append(line);

filei.close();
# add to the full secret phrases folder, of all combos
fileout = open('.secretphrases','a',);
# print(str(phrases));
print('--Splitting file--\n');
phrase1 = phrases[0].split();
phrase2 = phrases[1].split();
phrase3 = phrases[2].split();
phrase4 = phrases[3].split();
phrase5 = phrases[4].split();
#  use for extra file length for now, figure out dynamic file read
phrase6 = phrases[5].split();
# print(str(phrase1));
# print(str(phrase2));
# print(str(phrase3));
# print(str(phrase4));
# print(str(phrase5));
print('--Generating passphrases--\n');
# go through every combo variety between all phrases or groups
for i1 in range(0, len(phrase1)):
    for i2 in range(0, len(phrase2)):
        for i3 in range(0,len(phrase3)):
            for i4 in range(0, len(phrase4)):
                for i5 in range(0, len(phrase5)):
                    for i6 in range(0, len(phrase6)):
                        passphrase = phrase1[i1] + phrase2[i2] + phrase3[i3] + phrase4[i4] + phrase5[i5] + phrase6[i6] + '\n';
                        fileout.write(passphrase);
                    # print(passphrase);


fileout.close();



# print(str(passphrase));
    

