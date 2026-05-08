with open('/Users/parthdixit/Downloads/11-months-main/src/App.tsx', 'r') as f:
    content = f.read()
    
# Fix the syntax error by replacing the problematic line
fixed_content = content.replace(
        'desc: "the thumbs up, the cheesy crust, and the way everything felt so right just being with you.",',
        'desc: "the thumbs up, the cheesy crust, and the way everything felt so right just being with you.",'
    )

with open('/Users/parthdixit/Downloads/11-months-main/src/App.tsx', 'w') as f:
    f.write(fixed_content)

print("Syntax error fixed!")
