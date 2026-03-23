# API Errors
Errors are designed to comply with RFC 7807 and will always include the following attributes:
- type
- title
- detail
- instance
- status

Other attributes may also be included:
- **errors**- Feedback about specific aspects of the request such as invalid field inputs