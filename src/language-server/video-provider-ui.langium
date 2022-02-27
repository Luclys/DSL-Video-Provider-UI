grammar VideoProviderUi
hidden(WS, SL_COMMENT, ML_COMMENT)

App:
    'application' name=STRING
    'favicon' favicon=STRING
    (pages+=Page)*;

Page:
    'page' name=STRING
    views+=View (',' views+=View)* ':'
    ('header' ':' header=Layout)?
    'body' ':' body=Layout
    ('footer' ':' footer=Layout)?;

Layout:
    '-' ( type='column' '(' columnSize+=INT (',' columnSize+=INT)* ')'
        | type='row' ) ':'
    (components+=Component)*;

Component:
    '-' (Carousel | Catalog | Chat | Comment | Searchbar | Space | Media);


Carousel: type='carousel' qtyElements=INT;

Catalog:
    type='catalog' title=STRING
    ((layout='horizontal' | layout='vertical') size=INT
     | layout='grid' sizeX=INT 'x' sizeY=INT);

Chat: type='chat';

Comment: type='comment';

Searchbar: type='searchBar';

Space: type='space';

Media: (type='image' | type='video');

View returns string: 'desktop' | 'tablet' | 'mobile';

terminal WS: /\s+/;
terminal ID: /[_a-zA-Z][\w_]*/;
terminal INT returns number: /[0-9]+/;
terminal STRING: /"[^"]*"|'[^']*'/;

terminal ML_COMMENT: /\/\*[\s\S]*?\*\//;
terminal SL_COMMENT: /\/\/[^\n\r]*/;
