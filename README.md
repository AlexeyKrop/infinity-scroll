### API Design
Немного отошел от сигнатуры в ТЗ, сгруппировав фильтры в отдельный объект:
- Было: `{ pageSize, pageNum, searchText, dateFrom, dateTo, app }`
- Стало: `{ pageSize, pageNum, filters: { searchText, dateFrom, dateTo, app } }`

Причины:
- Масштабируемость - легко добавить новые фильтры
- Читаемость - явное разделение пагинации и фильтрации
